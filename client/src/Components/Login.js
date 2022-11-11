import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Login(){

    const Whensubmit = async(event) => {
        event.preventDefault();

        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if(username === '' || username === null){
            alert('enter username');
        }
        else if(password === '' || password === null){
            alert('enter password');
        }
        else{
            await axios.post('http://localhost:3008/Login',datastring,config)
                  .then(function(res){
                    if(res.data.status === 'query_not_inserted'){
                        alert('Not registered properly');
                        window.location.reload();
                    }
                    else if(res.data.status === 'Success'){
                        let name1 = res.data.name;
                        if(res.data.name === 'Saravanan'){
                            alert('Welcome'+name1);
                            localStorage.setItem('username',name1);
                            window.location.href="./";
                        }
                    }
                    else if(res.data.status === 'Invalid_data'){
                        alert('Invalid data');
                        window.location.reload();
                    }
                  })
                  .catch(function(error){
                    alert(error);
                    window.location.reload();
                  })
        }


    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-3">&nbsp;</div>
                <div className="col-lg-6">
                <form onSubmit={Whensubmit}>
                <div className="table-responsive">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan={2}>Sign-in</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td><input type="text" name="username" id="username" className="form-control"/></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" name="password" id="password"
                                    className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="/Register">
                                        <button type="button" name="data_send" id="data_send" className="btn btn-success">
                                            register
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                <button type="submit" name="data_submit" id="data_submit" className="btn btn-warning">
                                        Login
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
                </div>
                <div className="col-lg-3">&nbsp;</div>
            </div>
        </div>
        </>
    )
}