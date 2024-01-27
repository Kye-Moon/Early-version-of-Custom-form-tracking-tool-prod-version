import React from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import {ResourceSummaryQuery, VariationQuery} from "gql-types";
import logo from "@/Assets/Logo.png";
import {generateRandomDocumentId} from "@/Lib/utils";
import {format} from "date-fns";

interface Props {
	variation: VariationQuery['jobRecord']
	organisationLogoUrl: string | undefined | null
	orgName: string | undefined | null
	labourResources: {
		id: string,
		description: string | null | undefined,
		hours: string | null | undefined,
		rate: string | null | undefined,
		numPeople: string | null | undefined
	}[]
	materialResources: {
		id: string,
		description: string | null | undefined,
		quantity: string | null | undefined,
		unitPrice: string | null | undefined
	}[]
	equipmentResources: {
		id: string,
		description: string | null | undefined,
		quantity: string | null | undefined,
		unitPrice: string | null | undefined
	}[]
	otherResources: {
		id: string,
		description: string | null | undefined,
		unitPrice: string | null | undefined
	}[],
	summaryData: ResourceSummaryQuery['variationResourceSummary']
}

// Create Document Component
export const MyDocument = ({
							   variation,
							   labourResources,
							   materialResources,
							   equipmentResources,
							   otherResources,
							   summaryData,
							   organisationLogoUrl,
							   orgName
						   }: Props) => {

	return (

		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Image src={organisationLogoUrl ?? logo}
						   style={{width: "40px", height: "auto", margin: '2'}}/>
					<View style={styles.invoiceTextNumberContainer}>
						<Text>{`Title: ${variation.title}`}</Text>
						<Text style={styles.invoiceId}>{`Document ID: ${generateRandomDocumentId(orgName ?? "DOC")}`}</Text>
					</View>
					<View style={styles.invoiceTextNumberContainer}>
						<Text>{`Date of work: ${format(new Date(variation.createdAt)," hh:mm a dd, MMM, yyyy")}`}</Text>
					</View>
					<View style={styles.descriptionContainer}>
						<Text>{`Description of work`}</Text>
						<Text>{variation.description ?? "-"}</Text>
					</View>
				</View>
				<View style={styles.dividerLG}/>
				{labourResources.length > 0 && (
					<View>
						<Text style={styles.lineItemHeader}>Labour</Text>
						<View style={styles.tableHeader}>
							<Text style={[styles.leftCell, {width: "40%"}]}>Description</Text>
							<Text style={[styles.innerCell, {width: "20%"}]}>Hours</Text>
							<Text style={[styles.innerCell, {width: "20%"}]}>Rate</Text>
							<Text style={[styles.rightCell, {width: "20%"}]}># People</Text>
						</View>
						{labourResources.map((item) => {
							return (
								<View key={item.id} style={styles.tableRow}>
									<Text
										style={[styles.leftCell, {
											width: "40%"
										}]}>{item.description}</Text>
									<Text
										style={[styles.innerCell, {width: "20%"}]}>{item?.hours}</Text>
									<Text
										style={[styles.innerCell, {width: "20%"}]}>{`$${item?.rate ?? "-"}`}</Text>
									<Text
										style={[styles.rightCell, {width: "20%"}]}>{item?.numPeople}</Text>
								</View>
							);
						})}
						<Text style={styles.totalCell}>{`Total: ${summaryData.labourTotal}`}</Text>
					</View>
				)}
				{materialResources.length > 0 && (
					<View style={styles.lineItemTableContainer}>
						<Text style={styles.lineItemHeader}>Materials</Text>
						<View style={styles.tableHeader}>
							<Text style={[styles.leftCell, {width: "60%"}]}>Description</Text>
							<Text style={[styles.innerCell, {width: "20%"}]}>Units</Text>
							<Text style={[styles.rightCell, {width: "20%"}]}>Unit Cost</Text>
						</View>
						{materialResources.map((item) => {
							return (
								<View key={"item.id"} style={styles.tableRow}>
									<Text
										style={[styles.leftCell, {
											width: "60%"
										}]}>{item.description}</Text>
									<Text
										style={[styles.innerCell, {width: "20%"}]}>{item?.quantity}</Text>
									<Text
										style={[styles.rightCell, {width: "20%"}]}>{`$${item?.unitPrice}`}</Text>
								</View>
							);
						})}
						<Text
							style={styles.totalCell}>{`Total: $${summaryData.materialTotal}`}</Text>
					</View>
				)}

				{equipmentResources.length > 0 && (
					<View style={styles.lineItemTableContainer}>
						<Text style={styles.lineItemHeader}>Equipment</Text>
						<View style={styles.tableHeader}>
							<Text style={[styles.leftCell, {width: "80%"}]}>Description</Text>
							<Text style={[styles.rightCell, {width: "20%"}]}>Cost</Text>
						</View>
						{equipmentResources.map((item) => {
							return (
								<View key={"item.id"} style={styles.tableRow}>
									<Text
										style={[styles.leftCell, {
											width: "80%"
										}]}>{item.description}</Text>
									<Text
										style={[styles.rightCell, {width: "20%"}]}>{`$${Number(item?.quantity) * Number(item?.unitPrice)}`}</Text>
								</View>
							);
						})}
						<Text
							style={styles.totalCell}>{`Total: $${summaryData.equipmentTotal}`}</Text>
					</View>
				)}
				{otherResources.length > 0 && (
					<View style={styles.lineItemTableContainer}>
						<Text style={styles.lineItemHeader}>Other</Text>
						<View style={styles.tableHeader}>
							<Text style={[styles.leftCell, {width: "80%"}]}>Description</Text>
							<Text style={[styles.rightCell, {width: "20%"}]}>Cost</Text>
						</View>
						{otherResources.map((item) => {
							return (
								<View key={"item.id"} style={styles.tableRow}>
									<Text
										style={[styles.leftCell, {
											width: "80%"
										}]}>{item.description}</Text>
									<Text
										style={[styles.rightCell, {width: "20%"}]}>{`$${Number(item?.unitPrice)}`}</Text>
								</View>
							);
						})}
						<Text style={styles.totalCell}>{`Total: $${summaryData.otherTotal}`}</Text>
					</View>
				)}
				<View style={styles.signatureTotalContainer}>
					<View style={styles.signatureContainer}>
						<Text style={styles.signatureText}>Signature: ________________</Text>
					</View>
					<View style={styles.totalContainer}>
						<Text style={styles.totalText}>
							Total($): {summaryData.total}
						</Text>
					</View>
				</View>
				<View style={styles.footer}>
					{/*	<Text style={styles.footerText}>{"record?.company.city"}</Text>*/}
					{/*	<Text style={styles.footerText}>*/}
					{/*		{"record?.company.address}, {record?.company.country"}*/}
					{/*	</Text>*/}
				</View>
			</Page>
		</Document>
	);
};
// Create styles
const styles = StyleSheet.create({
	viewer: {
		paddingTop: 32,
		width: "100%",
		height: "80vh",
		border: "none",
	},
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
	descriptionContainer: {
		marginTop: 12,
		display: "flex",
		flexDirection: "column",
	},
	invoiceId: {
		textAlign: "center",
	},
	invoiceForFromContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	invoiceForFromTitle: {
		marginBottom: 24,
	},
	invoiceFor: {
		flex: 1.5,
	},
	invoiceFrom: {
		flex: 1,
	},
	invoiceForFromText: {
		color: "#787878",
		lineHeight: 1.5,
	},
	dividerSM: {
		width: "100%",
		height: 1,
		marginTop: 12,
		marginBottom: 12,
		backgroundColor: "#e5e5e5",
	},
	dividerLG: {
		width: "100%",
		height: 1,
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: "#e5e5e5",
	},
	tableHeader: {
		display: "flex",
		flexDirection: "row",
		borderBottom: "0.5px solid #000",
		backgroundColor: "#f5f5f5",
	},
	tableRow: {
		display: "flex",
		flexDirection: "row",
	},
	leftCell: {
		fontSize: 11,
		paddingVertical: 2,
		borderBottom: "0.5px solid #000",
	},
	innerCell: {
		fontSize: 11,
		paddingVertical: 2,
		borderBottom: "0.5px solid #000",
		textAlign: "center",

	},
	rightCell: {
		fontSize: 11,
		paddingVertical: 2,
		borderBottom: "0.5px solid #000",
		textAlign: "center",
	},
	totalCell: {
		fontSize: 11,
		paddingVertical: 4,
		borderBottom: "0.5px solid #000",
		textAlign: "right",
		width: "100%",
		fontWeight: "bold",
	},
	signatureTotalContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
	},
	signatureContainer: {},
	totalContainer: {},
	signatureText: {
		marginTop: 16,
	},
	totalText: {
		marginTop: 16,
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
	lineItemHeader: {
		fontWeight: 'semibold',
		paddingBottom: 4,
	},
	lineItemTableContainer: {
		marginTop: 14,
	},

});
