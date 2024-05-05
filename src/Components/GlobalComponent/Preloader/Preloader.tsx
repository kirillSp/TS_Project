import { FC } from "react";
import preloader from "../../../Img/Preloader.svg";

let Preloader: FC = () => {
    return <div>
        <img src={preloader} />
    </div>
}

export default Preloader;