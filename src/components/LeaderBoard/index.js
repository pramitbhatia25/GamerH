import { useState } from "react";
import { useEffect } from "react";
import "./index.scss";

function LeaderBoard() {

    useEffect(() => {
        getData();
    }, [])

    var [list_data, setListData] = useState([]);

    
    async function getData() {
        const res = await fetch("http://localhost:1337/api/fetchUsers", { method: "GET" });

        const data = await res.json();
        let temp = []
        data.users.sort((a, b) => (a.steps > b.steps) ? -1 : 1)

        temp.push({ rank: "RANK", handle: 'HANDLE', name: 'NAME', steps: "STEPS",});
        for (let i = 0; i < data.users.length; i++) {
            temp.push({ rank: i+1, handle: data.users[i].handle, name: data.users[i].name, steps: data.users[i].steps })
        }
        setListData(temp);
    }

    function ListItem(item) {
        console.log(item)
        return <div className="leaderboard_list_item">
            <div className="item rank">
                {item.i.rank}
            </div>
            <div className="item name">
                {item.i.name}
            </div>
            <div className="item handle">
                {item.i.handle}
            </div>
            <div className="item steps">
                {item.i.steps}
            </div>
        </div>
    }

    return <>
        <div className="leaderboard_list">
            {list_data.map((d) => 
                        <ListItem key={d.handle} i={d} />
                )}
        </div>
    </>
}

export default LeaderBoard;