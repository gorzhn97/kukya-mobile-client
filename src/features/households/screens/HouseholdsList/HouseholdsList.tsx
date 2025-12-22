import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Text, View } from "react-native"
import { useHouseholds } from "../../../../api/households/householdsHooks"

export const HouseholdsList = () => {

    const { data: households, isLoading, isError } = useHouseholds()

    if (isLoading) {
        return <View>Loading...</View>
    }
    if (isError) {
        return <View>Error loading households</View>
    }

    return
}

