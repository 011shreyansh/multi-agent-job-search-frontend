import "../styles/user-circle.css"
function UserCircle({name}){
    return(
        <div className="user-circle">
            {name}
        </div>
    );
}
export default UserCircle;