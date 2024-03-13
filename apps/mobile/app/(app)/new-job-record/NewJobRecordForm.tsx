import React, {useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    InputField,
    Text,
    Textarea,
    TextareaInput,
    useToast
} from "@gluestack-ui/themed";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInputWrapper from "../../../components/FormInputWrapper";
import {useLazyQuery, useMutation} from "@apollo/client";
import {graphql} from "gql-types";
import {showErrorToast, showSuccessToast} from "../../../lib/toasts";
import * as ImagePicker from 'expo-image-picker';
import FormPageTemplate from "../../../components/FormPageTemplate";
import {uploadImages} from "../../../lib/s3";
import {useRouter} from "expo-router";
import {createMutation, updateMutation} from "../../../lib/jobRecordService";
import JobSelect from "../../../components/JobSelect/JobSelect";
import ImageUploadLoading from "../../../components/ImageUploadLoading";
import {newJobRecordDetailsSchema} from "./newJobRecordFormSchema";
import ScopeItemSelect from "../../../components/ScopeItemSelect/ScopeItemSelect";
import JobRecordTypeSelect from "../../../components/JobRecordTypeSelect/JobRecordTypeSelect";
import {Camera, ImagePlus} from "lucide-react-native";
import {ImageGridPreview} from "../../../components/ImageGridPreview";
import VariationAdditionalFormFields from "./VariationAdditionalFormFields";
import RiskLevelSelect from "../../../components/RiskLevelSelect/RiskLevelSelect";
import {stripEmptyValues} from "../../../lib/utils";
import {variationsCellQuery} from "../../../components/home/VariationsCell/VariationsCell";

const preSignedUrlQuery = graphql(`
    query PreSignedUrl($key: String!) {
        presignedUrl(key: $key)
    }
`)

export default function NewJobRecordForm() {
    const router = useRouter();
    const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [getPresignedUrl] = useLazyQuery(preSignedUrlQuery)
    const [uploadingImages, setUploadingImages] = useState<boolean>(false)
    const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined)
    const [recordType, setRecordType] = useState<string | undefined>(undefined)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.5,
            allowsMultipleSelection: true,
            selectionLimit: 8,
        });
        if (!result.canceled) {
            handleAddImage(result.assets)
        }
    };

    const takePhoto = async () => {
        if (!status?.granted) {
            await requestPermission();
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            handleAddImage(result.assets)
        }
    }

    const handleAddImage = (result: ImagePicker.ImagePickerAsset[]) => {
        setImages([...images, ...result])
    }

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const form = useForm({
        mode: 'onBlur', resolver: zodResolver(newJobRecordDetailsSchema),
        defaultValues: {
            jobId: "",
            scopeRef: "",
            title: "",
            description: "",
            flag: '',
            type: "",
            hours: '',
            numPeople: '',
            who: '',
            materials: '',
            equipment: '',
        }
    })
    const toast = useToast()
    const [saveDetails, {loading}] = useMutation(createMutation, {
        onError: (error) => showErrorToast({error, toast}),
        onCompleted: (data) => showSuccessToast({toast, message: 'Job record saved'}),
        refetchQueries: [{query: variationsCellQuery, variables: {input: {}}}],
        awaitRefetchQueries: true
    })
    const [updateDetails, {loading: updateLoading}] = useMutation(updateMutation, {
        onError: (error) => showErrorToast({toast, message: "Error saving job record images"}),
        onCompleted: (data) => showSuccessToast({toast, message: 'Job record images saved'}),
    })

    const onSubmit = async (data: any) => {
        const strippedData = stripEmptyValues(data)

        const jobRecord = await saveDetails({
            variables: {
                input: {
                    ...strippedData,
                }
            }
        })

        if (!jobRecord.data?.createJobRecord) {
            return;
        }
        if (images.length > 0) {
            setUploadingImages(true)
            const imageUrls = await uploadImages({
                images: images,
                getPresignedUrl: getPresignedUrl,
                variationId: jobRecord.data.createJobRecord.id,
            })

            await updateDetails({
                variables: {
                    input: {
                        id: jobRecord.data.createJobRecord.id,
                        imageUrls: imageUrls
                    }
                }
            })
        }

        form.reset()
        setUploadingImages(false)
        router.push('/')
    };


    return (
        <>
            <FormPageTemplate form={form} buttonLabel={'Save'} onSubmit={onSubmit}>
                <Controller
                    control={form.control}
                    name="jobId"
                    render={({field, formState, fieldState}) => (
                        <FormInputWrapper isRequired={true} title={'Job'} formState={formState} field={field}>
                            <JobSelect onValueChange={(value) => {
                                field.onChange(value)
                                setSelectedJob(value)
                            }}/>
                        </FormInputWrapper>
                    )}
                />
                <Controller
                    control={form.control}
                    name="scopeRef"
                    render={({field, formState, fieldState}) => (
                        <FormInputWrapper helperText={"Optional reference to a scope item"} title={'Scope Reference'}
                                          formState={formState} field={field}>
                            <ScopeItemSelect jobId={selectedJob} onValueChange={field.onChange}/>
                        </FormInputWrapper>
                    )}
                />
                <Controller
                    control={form.control}
                    name="type"
                    render={({field, formState, fieldState}) => (
                        <FormInputWrapper isRequired={true} title={'Record type'} formState={formState} field={field}>
                            <JobRecordTypeSelect onValueChange={(value) => {
                                field.onChange(value)
                                setRecordType(value)
                            }}/>
                        </FormInputWrapper>
                    )}
                />
                {!!recordType && (
                    <>
                        <Controller
                            control={form.control}
                            name="title"
                            render={({field, formState, fieldState}) => (
                                <FormInputWrapper isRequired={true} title={'Title'} formState={formState}
                                                  field={field}>
                                    <Input>
                                        <InputField
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            onChange={value => field.onChange(value.nativeEvent.text)}
                                        />
                                    </Input>
                                </FormInputWrapper>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="description"
                            render={({field, formState, fieldState}) => (
                                <FormInputWrapper title={'Notes / Description'} formState={formState} field={field}>
                                    <Textarea>
                                        <TextareaInput
                                            role="summary"
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            onChange={value => field.onChange(value.nativeEvent.text)}
                                        />
                                    </Textarea>
                                </FormInputWrapper>
                            )}
                        />
                        {(recordType === 'QA' || recordType === "SAFETY") && (
                            <Controller
                                control={form.control}
                                name="flag"
                                render={({field, formState, fieldState}) => (
                                    <FormInputWrapper title={'Risk Level'} formState={formState} field={field}>
                                        <RiskLevelSelect onValueChange={field.onChange}/>
                                    </FormInputWrapper>
                                )}
                            />
                        )}
                        <Box>
                            <HStack marginTop={12} width={'$full'} gap={'$4'} justifyContent='space-between'
                                    alignItems={'center'}>
                                <Text size={'lg'} bold>Images</Text>
                                <ButtonGroup>
                                    <Button size={'sm'} onPress={takePhoto}>
                                        <Camera color={'white'}/>
                                    </Button>
                                    <Button size={'sm'} onPress={pickImage}>
                                        <ImagePlus color={'white'}/>
                                    </Button>
                                </ButtonGroup>
                            </HStack>
                            <Text py={'$2'} size={'xs'}>Choose or take up to 8 images</Text>
                            <Box>
                                <ImageGridPreview handleRemoveImage={handleRemoveImage} images={images} size={4}/>
                            </Box>
                        </Box>
                    </>
                )}
                {recordType === 'VARIATION' && (
                    <VariationAdditionalFormFields form={form}/>
                )}
            </FormPageTemplate>
            {uploadingImages && (<ImageUploadLoading/>)}
        </>
    );
}



