	const badgeVariant = ["default", "red", "yellow", "green", "blue", "purple", "pink"];

type BadgeVariantType = 'default' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

function stringToHashCode(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const character = str.charCodeAt(i);
		hash = ((hash << 11) - hash) + character;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

export function getBadgeVariant(type: string): BadgeVariantType {
	const index = stringToHashCode(type) % badgeVariant.length;
	return badgeVariant[index] as BadgeVariantType;
}
