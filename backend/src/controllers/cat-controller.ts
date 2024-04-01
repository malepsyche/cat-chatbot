import { Request, Response } from 'express';
import catService from '@services/cat-service';

const get = async (req: Request, res: Response): Promise<any> => {
    res.send('/fetchCats works!'); 
}

const fetchCats = async (req: Request, res: Response): Promise<any> => {
	try {	
		const messageContent: string = req.query.messageContent as string;
		const catArray = await catService.fetchCats(messageContent);
		res.json({
			"catArray" : catArray
		})

	} catch (error) {
		console.log('Error in /fetchCats', error);
	}
}



export default {
  get,
  fetchCats
}