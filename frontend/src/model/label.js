import RestModel from "model/rest";
import Api from "common/api";
import {DateTime} from "luxon";

class Label extends RestModel {
    getDefaults() {
        return {
            ID: 0,
            CreatedAt: "",
            UpdatedAt: "",
            DeletedAt: "",
            LabelUUID: "",
            LabelSlug: "",
            CustomSlug: "",
            LabelName: "",
            LabelPriority: 0,
            LabelFavorite: false,
            LabelDescription: "",
            LabelNotes: "",
            PhotoCount: 0,
            Links: [],
        };
    }

    getEntityName() {
        return this.LabelSlug;
    }

    getId() {
        return this.LabelUUID;
    }

    getTitle() {
        return this.LabelName;
    }

    thumbnailUrl(type) {
        return "/api/v1/labels/" + this.getId() + "/thumbnail/" + type;
    }

    thumbnailSrcset() {
        const result = [];

        result.push(this.thumbnailUrl("fit_720") + " 720w");
        result.push(this.thumbnailUrl("fit_1280") + " 1280w");
        result.push(this.thumbnailUrl("fit_1920") + " 1920w");
        result.push(this.thumbnailUrl("fit_2560") + " 2560w");
        result.push(this.thumbnailUrl("fit_3840") + " 3840w");

        return result.join(", ");
    }

    thumbnailSizes() {
        const result = [];

        result.push("(min-width: 2560px) 3840px");
        result.push("(min-width: 1920px) 2560px");
        result.push("(min-width: 1280px) 1920px");
        result.push("(min-width: 720px) 1280px");
        result.push("720px");

        return result.join(", ");
    }

    getDateString() {
        return DateTime.fromISO(this.CreatedAt).toLocaleString(DateTime.DATETIME_MED);
    }

    toggleLike() {
        this.LabelFavorite = !this.LabelFavorite;

        if (this.LabelFavorite) {
            return Api.post(this.getEntityResource() + "/like");
        } else {
            return Api.delete(this.getEntityResource() + "/like");
        }
    }

    like() {
        this.LabelFavorite = true;
        return Api.post(this.getEntityResource() + "/like");
    }

    unlike() {
        this.LabelFavorite = false;
        return Api.delete(this.getEntityResource() + "/like");
    }

    /* popularity(max) {
        if (!this.PhotoCount) {
            return 0;
        }

        if (this.PhotoCount >= max) {
            return 100;
        }

        return Math.ceil(max / this.PhotoCount);
    } */

    static getCollectionResource() {
        return "labels";
    }

    static getModelName() {
        return "Label";
    }
}

export default Label;
