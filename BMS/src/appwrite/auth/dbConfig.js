import conf from '../../conf/conf.js';
import { Client,ID, Databases, Storage, Query} from 'appwrite';

export class Service{
client = new Client();
databases;
storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        }
        catch(error){
            console.log("Error creating post:", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Error updating post:", error);
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error){
            console.log("Error deleting post:", error);
            return false;
        }
    }

    async getPostById(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Error getting post by slug:", error);
            throw error;
        }
    }

    async getAllPosts(){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )
        }
        catch(error){
            console.log("Error getting all posts:", error);
            throw error;
        }
    }

    async getAllActievPosts(queries = [Query.equal('status', 'active')]){
        try{
            return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
         );   
        }
        catch(error){
            console.log("Error getting all active posts:", error);
            throw error;
        }
    }

    //file Upload servies
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            }
        catch(error){
            console.log("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log("Error deleting file:", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}


const service = new Service();
export default service;