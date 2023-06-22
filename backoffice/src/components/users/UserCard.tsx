import { Component } from 'react'
import './UserCard.scss';

export default class UserCard extends Component { 

    render() {
        return (
            <>
                <div className="user-card">
                    <div className="user-pic">
                        <img src="https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png"  />
                    </div>
                    <b>Juan Ignacio Galarza</b>
                </div>
            </>
        )
    }
}