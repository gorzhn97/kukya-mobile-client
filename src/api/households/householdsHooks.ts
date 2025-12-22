import { useQuery } from "@tanstack/react-query"
import { getHouseholds } from "./householdsApi"
import { HouseholdViewModel } from "../../models/households/presentation/householdViewModel"
import { mapHouseholdToViewModel } from "../../models/households/mappers/householdMappers"



export const useHouseholds = () => {
    console.log('useHouseholds called');
    return useQuery<HouseholdViewModel[]>({
        queryKey: ['households'],
        queryFn: async () => {
            const households = await getHouseholds();
            return households.map(mapHouseholdToViewModel);
        }
    })
} 