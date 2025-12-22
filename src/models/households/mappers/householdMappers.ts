import { Household } from '../domain/household';
import { HouseholdViewModel } from '../presentation/householdViewModel';

export const mapHouseholdToViewModel = (household: Household): HouseholdViewModel => {
    return {
        id: household.id,
        name: household.name,
        numberOfMembers: household.memberIds.length,
        adminId: household.adminId,
    };
};
