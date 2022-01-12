import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository"; 

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    for(const objeto of this.users){
      if(objeto.id === id){
        return objeto;
      }
    }

    return undefined;
  }

  findByEmail(email: string): User | undefined {
    for(const objeto of this.users){
      if(objeto.email === email){
        return objeto;
      }
    }

    return undefined;
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
