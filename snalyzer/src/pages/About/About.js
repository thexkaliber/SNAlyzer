import React from 'react';
import lokSabha from '../../assets/images/lokSabha.png';
import './About.css';
import '../../App.css';

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <br></br>
            <br></br>
            <p>Social Network Analysis is the process of investigating social structures through the use of networks and graph theory. It characterizes networked structures in terms of nodes individual actors, people, or things within the network and the ties, edges, or links relationships or interactions that connect them. Examples of social structures commonly visualized through social network analysis include Social Media Networks Meme Spread, Information Circulation, Friendship and Acquaintance Networks, Peer Learner Networks, Business Networks, Knowledge Networks, Difficult Working Relationships, Collaboration Graphs, Kinship and Disease Transmission. <br></br><br></br> These networks are often visualized through sociograms in which nodes are represented as points and ties are represented as lines. These visualizations provide a means of qualitatively assessing networks by varying the visual representation of their nodes and edges to reflect attributes of interest.<br></br><br></br>
            Social network analysis has emerged as a key technique in Modern Sociology. It has also gained significant popularity in the following - Anthropology, Biology, Demography, Communication Studies, Economics, Geography, History, Information Science, Organizational Studies, Political Science, Public Health, Social Psychology, Development Studies, Sociolinguistics, and Computer Science, Education and Distance Education Research.</p><br></br>
            <img alt="Lok Sabha" src={lokSabha}></img><br></br><br></br>
            <p>In this project we will be performing a Social Network Analysis on Parlimentary Q&A Sessions to access the level of criticiality towards the Central Government and Relevant Policy Decisions.</p>
        </div>
    );
};

export default About;