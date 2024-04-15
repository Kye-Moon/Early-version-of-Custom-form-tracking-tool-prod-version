import React from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import logo from "@/Assets/Logo.png";
import {generateRandomDocumentId} from "@/Lib/utils";
import {format} from "date-fns";

interface Props {
	formResponse: any
	jobForm: any
	createdAt: string
	jobName: string
	organisationLogoUrl: string | undefined | null
	orgName: string | undefined | null
	images: string[]
	submitedBy: string
}

// Create Document Component
export const FormResponsePdf = ({
									formResponse,
									jobName,
									jobForm,
									organisationLogoUrl,
									orgName,
									createdAt,
									images,
									submitedBy
								}: Props) => {
	const {response} = formResponse;
	const {formTemplate} = jobForm;
	const {name, description, structure} = formTemplate;

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Image src={organisationLogoUrl ?? logo}
						   style={{width: "40px", height: "auto", margin: '2', marginBottom: '8'}}/>
					<Text>{`Job: ${jobName}`}</Text>
					<View style={styles.invoiceTextNumberContainer}>
						<Text>{`Form: ${name}`}</Text>
						<Text
							style={styles.invoiceId}>{`Document ID: ${generateRandomDocumentId(orgName ?? "DOC")}`}</Text>
					</View>
					<Text>{description ?? "-"}</Text>
					<View style={{paddingVertical: 8}}>
						<Text>{`Submitted: ${format(new Date(createdAt), " hh:mm a dd, MMM, yyyy")}`}</Text>
						<Text>{`By: ${submitedBy}`}</Text>
					</View>
				</View>
				<View style={styles.responseContainer}>
					{structure.elements.map((element: any) => {
						const responseValue = response[element.id];
						const label = element.extraAttributes?.label || '';
						return (
							<>
								{label ? (
									<View key={element.id} style={styles.answerContainer}>
										{label && <Text style={styles.labelText}>{label}</Text>}
										{label &&
											<Text
												style={styles.valueText}>{responseValue ?? 'N/A'}</Text>}
									</View>
								) : (<> </>)
								}
							</>
						);
					})}
				</View>
				<View style={styles.imageContainer}>
					{images.map((image, index) => (
						// <Text>{image}</Text>
						<Image src={{
							uri: image,
							method: "GET",
							headers: {"Cache-Control": "no-cache"},
							body: ""
						}}
							   style={{
								   width: "100px",
								   height: "auto",
								   margin: '2',
								   marginBottom: '8'
							   }}/>
					))}
				</View>
				<View style={styles.footer}>
				</View>
			</Page>
		</Document>
	);
};

// Create styles
const styles = StyleSheet.create({
	page: {
		display: "flex",
		padding: "0.4in 0.4in",
		fontSize: 12,
		color: "#333",
		backgroundColor: "#fff",
	},
	invoiceTextNumberContainer: {
		marginTop: 12,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	invoiceId: {
		textAlign: "center",
	},
	invoiceForFromContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	responseContainer: {
		marginTop: 12,
		display: "flex",
		flexDirection: "column",
		gap: 12,
		paddingTop: 12,
	},
	answerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottom: "1px solid #e5e5e5",
	},
	footer: {
		borderTop: "1px solid #e5e5e5",
		paddingTop: 8,
		marginTop: "auto",
	},
	footerText: {
		color: "#787878",
		lineHeight: 1.5,
	},
	labelText: {
		fontWeight: 'bold',
		fontSize: 12,
		paddingBottom: 4,
	},
	valueText: {
		marginLeft: 8,
	},
	// grid Of 3 images per row
	imageContainer: {
		marginTop: 20,
		gap: 12,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",

	},
});
