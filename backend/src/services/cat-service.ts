import axios from 'axios';

class catService {
    private catApiKey = process.env.CAT_API_KEY;

    async fetchCats(messageContent: string): Promise<any> {
        try {
            const breedId: string = '';
            const limit: number = 1;
            const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}${breedId ? `&breed_id=${breedId}` : ''}`;
            const response = await axios.get(url, { headers: { 'x-api-key': this.catApiKey } });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log('Error in fetchCats ', error);
        }
    }
    


}

export default new catService();