const badgeColors = [
    {
        bg: "$green100",
        text: "$green900"
    },
    {
        bg: "$blue100",
        text: "$blue900"
    },
    {
        bg: "$yellow100",
        text: "$yellow900"
    },
    {
        bg: "$purple100",
        text: "$purple900"
    },
    {
        bg: "$orange100",
        text: "$orange900"
    },
    {
        bg: "$pink100",
        text: "$pink900"
    },
    {
        bg: "$cyan100",
        text: "$cyan900"
    },
    {
        bg: "$lime100",
        text: "$lime900"
    },
    {
        bg: "$gray100",
        text: "$gray900"
    },
    {
        bg: "$blueGray100",
        text: "$blueGray900"
    },
    {
        bg: "$warmGray100",
        text: "$warmGray900"
    },
    {
        bg: "$emerald100",
        text: "$emerald900"
    },
    {
        bg: "$red100",
        text: "$red900"
    },
    {
        bg: "$rose100",
        text: "$rose900"
    },
    {
        bg: "$amber100",
        text: "$amber900"
    },
    {
        bg: "$teal100",
        text: "$teal900"
    },
    {
        bg: "$lightBlue100",
        text: "$lightBlue900"
    },
    {
        bg: "$indigo100",
        text: "$indigo900"
    }
]

function stringToHashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function getBadgeColors(type: string) {
    const index = stringToHashCode(type) % badgeColors.length;
    return {bg: badgeColors[index].bg, text: badgeColors[index].text};
}
