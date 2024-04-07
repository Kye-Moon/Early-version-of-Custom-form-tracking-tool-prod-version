import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function enumToSentenceCase(enumValue: string) {
	// Split the input string by underscores
	const words = enumValue.split("_");

	// Capitalize the first letter of each word and convert the rest to lowercase
	const sentenceCaseWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	// Join the words back together with a space between them
	return sentenceCaseWords.join(" ");
}

export const formatClerkRole = (role: string) => {
	const roleArray = role.split(":");
	return roleArray[roleArray.length - 1];
}

export const getUserTypeBadgeVariant = (status?: string | null) => {
	switch (status) {
		case "org:admin":
			return "blue";
		case "org:member":
			return "green";
		case "x":
			return "red";
		case "OWNER":
			return "yellow";
		default:
			return null;
	}
};

export function formatPhoneNumber(phoneNumber: string) {
	// Remove all non-digit characters
	const cleanedNumber = phoneNumber.replace(/\D/g, '');

	// Check if the number starts with '0', if yes, replace it with '+61'
	if (cleanedNumber.startsWith('0')) {
		return `+61${cleanedNumber.slice(1)}`;
	}

	// Check if the number doesn't start with '+61', add it at the beginning
	if (!cleanedNumber.startsWith('+61')) {
		return `+61${cleanedNumber}`;
	}

	return cleanedNumber;
}

export const hasOrgRole = (orgRole: any, role: string) => {
	return orgRole === role;
}

// Find the key "varify_role" and check if it is the same as the role
export const hasAppRole = (metadata: any, role:string) => {
	return metadata['varify_role'] === role;
}

export function isEmptyObject(obj: {} | null) {
	// First check if obj is an object
	if (typeof obj === 'object' && obj !== null) {
		// Then check if it has no properties of its own
		return Object.keys(obj).length === 0;
	}
	return false;
}

/*
	* Generates a random document from the name
 */
export const generateRandomDocumentId = (OrgName: string) => {
	const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
	const shortOrgName = OrgName.replace(/\s/g, '').substring(0, 3).toUpperCase();
	return `${shortOrgName}-${randomString}`;
}


export const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']

/*
	* Converts the file type to a readable format
 */
export const convertFileTypeNameToReadable = (fileType: string) => {
	switch (fileType) {
		case 'image/png':
			return 'PNG';
		case 'image/jpeg':
			return 'JPEG';
		case 'image/jpg':
			return 'JPG';
		case 'application/pdf':
			return 'PDF';
		default:
			return 'Unknown';
	}
};


export const stripEmptyValues = (obj: any) => {
	const newObj: any = {};
	Object.entries(obj).forEach(([key, value]) => {
		if (value) {
			newObj[key] = value;
		}
	});
	return newObj;
}

export function idGenerator(): string {
	return Math.floor(Math.random() * 10001).toString();
}
