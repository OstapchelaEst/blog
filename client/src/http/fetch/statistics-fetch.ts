import $api from 'http/axios-instance';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';

class StatisticFetch {
  async getCountAllLikedPostst(userId: string) {
    try {
      const response = (await (
        await $api.post('/get-likes-statistic', { userId })
      ).data) as { countLikes: number };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserPosts(userId: string) {
    try {
      const response = (await $api.post('/all-user-posts', { userId })).data as IPost[];
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const StatisticFetchs = new StatisticFetch();
