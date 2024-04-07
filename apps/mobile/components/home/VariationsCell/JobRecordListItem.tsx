import React from 'react';
import {
    Badge,
    BadgeText,
    Box,
    Button,
    ButtonIcon,
    ButtonText,
    Divider,
    HStack,
    Text,
    VStack
} from "@gluestack-ui/themed";
import {VariationsCellQuery} from "gql-types";
import {enumToSentenceCase, truncate} from "../../../lib/utils";
import {StyleSheet} from "react-native";
import {EyeIcon} from "lucide-react-native";
import {Link} from "expo-router";
import {getBadgeColors} from "../../../lib/badgeUtils";

interface JobRecordListItemProps {
    jobRecord: VariationsCellQuery['searchJobRecords'][0]
}




export default function JobRecordListItem({jobRecord}: JobRecordListItemProps) {
    return (
        <Box
            p={2}
            rounded="$lg"
            overflow="hidden"
            m={2}
        >
            <HStack style={styles.row}>

                <VStack>
                    <HStack>
                        <Text fontWeight={'700'} size="md">{truncate(jobRecord.title, 20)}</Text>
                        <Badge
                            bg={getBadgeColors(jobRecord.type).bg}
                            borderRadius="$md"
                            size="sm"
                            variant="solid"
                            ml={8}
                        >
                            <BadgeText color={getBadgeColors(jobRecord.type).text}>{jobRecord.type}</BadgeText>
                        </Badge>
                    </HStack>
                    {jobRecord.description && <Text size={'2xs'}>{truncate(jobRecord.description ?? "", 25)}</Text>}
                    <Text size={'2xs'}>{`Job - ${jobRecord.job.title}`}</Text>
                    <Text size={'2xs'}>{`Submitted by - ${jobRecord.submittedBy.name}`}</Text>
                </VStack>
                <Badge
                    size="sm"
                    variant="solid"
                    ml={2}
                />
                <Link asChild={true}
                      href={{
                          pathname: "/(app)/job-record/[id]",
                          params: {id: jobRecord.id, jobRecordTitle: jobRecord.title}
                      }}>
                    <Button size={'xs'} width={'$20'}>
                        <ButtonText>View </ButtonText>
                        <ButtonIcon as={EyeIcon}/>
                    </Button>
                </Link>
            </HStack>
            <Divider my={'$2'}/>
        </Box>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

