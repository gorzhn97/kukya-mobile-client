import { Household } from '../../models/households/domain/household';

import { NEST_PUBLIC_API_URL } from '@env';

export const getHouseholds = async (): Promise<Household[]> => {
    const res: Response = await fetch(`${NEST_PUBLIC_API_URL}/households`);
    if (!res.ok) return [];
    return res.json();
}