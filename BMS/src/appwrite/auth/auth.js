import conf from '../../conf/conf.js';
import { Client, Account, ID} from 'appwrite';

class AuthService {
    client = new Client();
    account;
    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call a method
                return await this.logIn({email, password});
            }
            else {
                return userAccount;
            }
        }
        catch(error){
            console.log("Error creating account:", error);
            throw error;
        }
    }
    
    async logIn({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            console.log("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
    try {
        const session = await this.account.getSession('current');
        if (session) {
            return await this.account.get();
        }
        return null;
    } catch (error) {
        console.log("No active session");
        return null;
    }
    }

    async logOut() {
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("Error logging out:", error);
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;
