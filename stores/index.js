import UserStore from './UserStore';
import AuthStore from './AuthStore';

const userStore = new UserStore();
const authStore = new AuthStore();

export default {
  userStore: userStore,
  authStore: authStore,
};