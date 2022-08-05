
import axios from 'axios'
import config from './contentful.json'

const baseUrl = ' https://cdn.contentful.com'

export default {
  fetchPosts: (payload) =>
    axios.get(`${baseUrl}/spaces/${config.CTF_SPACE_ID}/entries`, {
      params: {
        access_token: config.CTF_ACCESS_TOKEN,
        content_type: config.CTF_CONTENT_TYPE,
        order: '-sys.createdAt',
        limit: payload?.limit,
        skip: payload?.skip,
      },
    }),
}
