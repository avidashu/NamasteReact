import {ErrorUrl} from "../utils/constants";

const Error = () => {
    return (
        <div>
            <h1>Oooops!!! Something is wrong</h1>
             <img className="err-img" src={ErrorUrl}></img>
        </div>
    );
}
export default Error;