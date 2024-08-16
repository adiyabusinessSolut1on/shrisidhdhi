import axios from "../axios";

import { BannerGetType } from "../types";
export const getBanner = (): Promise<BannerGetType[]> =>
    axios
        .get<BannerGetType[]>("/banner")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.message, error);
            throw error;
        });