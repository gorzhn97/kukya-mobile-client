import React from "react"
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { useHouseholds } from "../../../../api/households/householdsHooks"
import { HouseholdViewModel } from "../../../../models/households/presentation/householdViewModel"
import { colors } from "../../../../shared/theme/colors"


const Item = (item: HouseholdViewModel) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
        <View style={styles.itemContent}>
            <Text style={styles.householdName}>{item.name}</Text>
            <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                    {item.numberOfMembers} {item.numberOfMembers === 1 ? 'member' : 'members'}
                </Text>
            </View>
        </View>
        <View style={styles.chevronContainer}>
            <Text style={styles.chevron}>›</Text>
        </View>
    </TouchableOpacity>
);

const CreateHouseholdItem = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity style={styles.createItemContainer} activeOpacity={0.7} onPress={onPress}>
        <View style={styles.plusIconContainer}>
            <Text style={styles.plusIcon}>+</Text>
        </View>
        <Text style={styles.createText}>Create Household</Text>
    </TouchableOpacity>
);

export const HouseholdsList = () => {

    const { data: households, isLoading, isError } = useHouseholds()

    const handleCreateHousehold = () => {
        // TODO: Open create household modal
        console.log('Create household pressed');
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.statusText}>Loading.....</Text>
            </View>
        )
    }
    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error loading households</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={households}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={
                    <>
                        <View style={styles.separator} />
                        <CreateHouseholdItem onPress={handleCreateHousehold} />
                    </>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemContent: {
        flex: 1,
    },
    householdName: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 14,
        color: colors.text.secondary,
    },
    chevronContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    chevron: {
        fontSize: 24,
        color: colors.text.tertiary,
        fontWeight: '300',
    },
    separator: {
        height: 12,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    statusText: {
        fontSize: 16,
        color: colors.text.secondary,
    },
    errorText: {
        fontSize: 16,
        color: colors.error,
    },
    createItemContainer: {
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        borderStyle: 'dashed',
    },
    plusIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    plusIcon: {
        fontSize: 24,
        color: colors.text.inverse,
        fontWeight: '300',
        lineHeight: 28,
    },
    createText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
})

