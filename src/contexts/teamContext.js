import React from "react";

export const TeamContext = React.createContext(null);

export const TeamProvider = ({ children }) => {
    // there will be 30 people with avatar, name, id and job title
    // also I can set teams with 5 people in each team
    // I can delete people from team
    // I can add people to team
    // I can see all people in a team
    // I can see all teams
    // I can see all people
    // I can see all people in a team

    const [teams, setTeams] = React.useState([
        {
            id: '1',
            name: 'Erzak',
            people: [
                {
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    name: 'Ahmet',
                    id: '1',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=2',
                    name: 'Elif',
                    id: '2',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=3',
                    name: 'Ayhan',
                    id: '3',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=4',
                    name: 'Selin',
                    id: '4',
                    role: 'Erzak',
                }],
            type: 'Temel Gıda Sağlayıcılar',
            status: 'istirahatte'
        },
        {
            id: '2',
            name: 'Arama Kurtarma Ekibi 1',
            people: [
                {
                    avatar: 'https://i.pravatar.cc/150?img=8',
                    name: 'Ahmet',
                    id: '8',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=9',
                    name: 'Elif',
                    id: '9',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=10',
                    name: 'Ayhan',
                    id: '10',
                    role: 'Erzak',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=11',
                    name: 'Selin',
                    id: '11',
                    role: 'Erzak',
                }],
            type: 'Arama Kurtarma',
            status: 'istirahatte'
        },
        {
            id:"3",
            name:"Sağlık Ekibi",
            people:[
                {
                    avatar: 'https://i.pravatar.cc/150?img=12',
                    name: "Serhat",
                    id:"12",
                    role:"Vinç şöförü"
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=13',
                    name: 'Furkan',
                    id: '13',
                    role: 'Işık sağlayacı',
                },
                {
                    avatar: 'https://i.pravatar.cc/150?img=14',
                    name: 'Orkun',
                    id: '14',
                    role: 'Madenci',
                }
            ],
            type:"Sağlık Ekibi",
            status:"Görevde"
        }
    ]);
    const [people, setPeople] = React.useState([
        {
          avatar: 'https://i.pravatar.cc/150?img=45',
          name: 'Ayşe',
          id: '1',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=46',
          name: 'Ali',
          id: '2',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=47',
          name: 'Fatma',
          id: '3',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=48',
          name: 'Mehmet',
          id: '4',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=49',
          name: 'Zeynep',
          id: '5',
          role: 'Çadır',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=50',
          name: 'Mustafa',
          id: '6',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=51',
          name: 'Aysel',
          id: '7',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=52',
          name: 'Ahmet',
          id: '8',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=53',
          name: 'Elif',
          id: '9',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=54',
          name: 'Ayhan',
          id: '10',
          role: 'Çadır',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=55',
          name: 'Selin',
          id: '11',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=56',
          name: 'Hüseyin',
          id: '12',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=57',
          name: 'Özlem',
          id: '13',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=58',
          name: 'Burak',
          id: '14',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=59',
          name: 'Ebru',
          id: '15',
          role: 'Çadır',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=60',
          name: 'Emre',
          id: '16',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=61',
          name: 'Gül',
          id: '17',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=62',
          name: 'Deniz',
          id: '18',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=63',
          name: 'Yusuf',
          id: '19',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=64',
          name: 'Sevgi',
          id: '20',
          role: 'Çadır',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=65',
          name: 'Alişan',
          id: '21',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=66',
          name: 'Cemre',
          id: '22',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=67',
          name: 'Hasan',
          id: '23',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=68',
          name: 'İpek',
          id: '24',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=69',
          name: 'Can',
          id: '25',
          role: 'Çadır',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=70',
          name: 'Melike',
          id: '26',
          role: 'Sağlık',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=71',
          name: 'Selim',
          id: '27',
          role: 'Arama Kurtarma',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=72',
          name: 'Esra',
          id: '28',
          role: 'Erzak',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=73',
          name: 'Cihan',
          id: '29',
          role: 'Kıyafet',
        },
        {
          avatar: 'https://i.pravatar.cc/150?img=74',
          name: 'Begüm',
          id: '30',
          role: 'Çadır',
        },
      ]);
    const [team, setTeam] = React.useState({
        id: '1',
        name: 'Erzak',
        people: [
            {
                avatar: 'https://i.pravatar.cc/150?img=1',
                name: 'Ahmet',
                id: '1',
                role: 'Erzak',
            },
            {
                avatar: 'https://i.pravatar.cc/150?img=2',
                name: 'Elif',
                id: '2',
                role: 'Erzak',
            },
            {
                avatar: 'https://i.pravatar.cc/150?img=3',
                name: 'Ayhan',
                id: '3',
                role: 'Erzak',
            },
            {
                avatar: 'https://i.pravatar.cc/150?img=4',
                name: 'Selin',
                id: '4',
                role: 'Erzak',
            }],
        type: 'Temel Gıda Sağlayıcılar',
        status: 'istirahatte'
    });
    const [person, setPerson] = React.useState(null);

    const value = React.useMemo(() => ({ teams, setTeams, people, setPeople, team, setTeam, person, setPerson }), [teams, people, team, person]);

    return (
        <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
    );
};
