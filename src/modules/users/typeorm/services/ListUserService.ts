import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

class ListUserService {
    public async execute(): Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);

        const users = usersRepository.find();

        return users;
    }
}

export default ListUserService;
