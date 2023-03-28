import $api from 'http/axios-instance';

class StatisticFetch {
  async getCountAllLikedPostst(userId: { userId: string }) {
    try {
      const response = await $api.post('/get-likes-statistic', userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const StatisticFetchs = new StatisticFetch();
