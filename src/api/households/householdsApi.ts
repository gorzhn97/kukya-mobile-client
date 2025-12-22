
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getHouseholds = async () => {
    const res: Response = await fetch(`${API_URL}/api/households`);
    if (!res.ok) return [];
    return res.json();
}