import {StyleSheet} from "react-native";
import {Badge, BadgeText, Heading, View} from "@gluestack-ui/themed";
import React from "react";
import {graphql} from "gql-types";
import LabelAndValue from "./LabelAndValue";
import {formatClerkRole} from "../lib/utils";
import {useOrganization, useUser} from "@clerk/clerk-expo";
import {getBadgeVariant} from "webui/src/lib/badgeUtils";
import {getBadgeColors} from "../lib/badgeUtils";

const query = graphql(`
    query Settings {
        currentUser {
            name
            email
            phone
            organisation {
                name
            }
        }
    }
`)

export default function AccountDetailsCell() {
    const {user} = useUser();
    const {organization, membership} = useOrganization();
    return (
        <>
            <View style={styles.accountDetailsSection}>
                <Heading pb={'$4'}>Account Details</Heading>
                <View gap={'$2'}>
                    <LabelAndValue label={'Name'} value={user?.fullName}/>
                    <LabelAndValue label={'Email'} value={user?.emailAddresses[0].emailAddress}/>
                    <LabelAndValue label={'Organisation'} value={organization?.name}/>
                    <LabelAndValue label={'Role'}
                                   value={
                                       <Badge width={'$24'}
                                              bg={getBadgeColors(user?.organizationMemberships[0].role ?? '').bg}>
                                           <BadgeText
                                               color={getBadgeColors(user?.organizationMemberships[0].role ?? '').text}
                                           >{formatClerkRole(user?.organizationMemberships[0].role ?? '')}</BadgeText>
                                       </Badge>
                                   }/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: 16,
        margin: 16,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    accountDetailsSection: {
        flex: 1,
        justifyContent: 'flex-start',
    }
})