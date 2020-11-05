import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const getTrainer = () => {
  const userJwt = Cookies.get('jwt');
  let trainer = null;
  if (userJwt) {
    trainer = jwt.decode(userJwt);
  }

  return trainer;
}