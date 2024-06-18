// llamado fetch básico
export const getDatafrom = async(url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(response.status);
        } else {
            const data = await response.json();            
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}