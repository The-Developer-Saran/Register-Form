import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Register(){

    const Whensubmit = async(event) => {
        event.preventDefault();

        var datastring = new FormData(event.target);

        var config = {headers : {"enctype" : "multipart/form-data"}};

        
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let password = document.getElementById('password').value;

        
        if(name === '' || name === null){
            alert('enter name');
        }
        else if(email === '' || email === null){
            alert('enter email');
        }
        else if(phone === '' || phone === null){
            alert('enter phone');
        }
        else if(password === '' || password === null){
            alert('enter password');
        }
        else{
            await axios.post('http://localhost:3008/Register',datastring,config)
                  .then(function(res){
                    if(res.data.status === 'error'){
                        alert('Error');
                        window.location.reload();
                    }
                    else if(res.data.status === 'Inserted'){
                        alert('Profile Created');
                        window.location.href="./";
                    }
                  })
                  .catch(function(err){
                    alert(err);
                    window.location.reload();
                  })
        }


    }

    return (
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
                            <th colSpan={2}>Register here</th>
                        </tr>
                    </thead>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input type="text" name="name" id="name" className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td>
                                <input type="email" name="email" id="email" className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" name="password" id="password" className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/">
                                    <button type="button" name="login" id="login" className="btn btn-warning">
                                        Login
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button type="submit" name="submit" id="submit" className="btn btn-success">
                                    Register
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