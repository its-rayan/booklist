import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '@/logger';
import { Book, GoogleBook } from './interfaces';
import config from '@/config';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: 'Query parameter is required'
      });
      return;
    }

    const response = await axios.get(config.googleBooks.apiUrl, {
      params: {
        q,
        maxResults: 10,
        key: config.googleBooks.apiKey
      }
    });

    const books: Book = response.data.items.map((item: GoogleBook) => {
      const volume = item.volumeInfo;
      return {
        id: item.id,
        title: volume.title,
        authors: volume.authors,
        description: volume.description,
        thumbnail: volume.imageLinks?.thumbnail,
        infoLink: volume.infoLink
      };
    });

    res.json({
      status: 'success',
      data: books
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      error
    });
  }
};
