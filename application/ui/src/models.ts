import { CONFIG } from "../../config";

const DEFAULT_PROFILE_PATH = `${CONFIG.PFP_PATH}/default.png`
function checkBoolean(x: boolean, cond1: any, cond2: any) {
    if (x) {
        return cond1;
    } else {
        return cond2;
    }
}

export class MiniPostModel {
    readonly title: string;
    readonly authorName: string;
    readonly postId: string;
    readonly hasPfp: boolean;
    readonly authorId: string

    constructor(title: string, authorName: string, postId: string, hasPfp: boolean, authorId: string) {
        this.title = title;
        this.authorName = authorName;
        this.postId = postId;
        this.hasPfp = hasPfp;
        this.authorId = authorId;
    }

    getPostPath() {
        return `${CONFIG.POST_PATH}/${this.postId}`
    }

    getThumbnailPath() {
        return `${CONFIG.THUMBNAIL_PATH}/${this.postId}.jpg`
    }

    getProfilePath() {
        let possiblePfp = `${CONFIG.PFP_PATH}/${this.authorId}.png`;
        let path: string = checkBoolean(this.hasPfp, possiblePfp, DEFAULT_PROFILE_PATH);

        return path;
    }
}

export class CommentModel {
    readonly author: string;
    readonly authorId: string;
    readonly date: Date;
    readonly content: string;
    readonly hasPfp: boolean;

    constructor(author: string, authorId: string, date: Date, content: string, hasPfp: boolean) {
        this.author = author;
        this.authorId = authorId;
        this.date = date;
        this.content = content;
        this.hasPfp = hasPfp
    }

    getProfilePath() {
        let possiblePfp = `${CONFIG.PFP_PATH}/${this.authorId}.png`
        let path: string = checkBoolean(this.hasPfp, possiblePfp, DEFAULT_PROFILE_PATH);

        return path;
    }

    getDateString() {
        return this.date.toLocaleString();
    }
}