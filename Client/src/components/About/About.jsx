import style from './About.module.css'
const About = () => {
  return (
    <div className={style.aboutContainer}>

      <div className={style.imageContainer} > 
      <img src="src/assets/OIG.png" alt="avatar" />
      </div>

      <div className={style.textContainer} >
        <h2>App created by Evelyn...</h2>
        <p>The goal of this project is to put  my programming skills into practice on both the front end and the back end. The picture is just my avatar.If you would like to know me, I leave you my LinkedIn profile for you to visit it. I hope you liked it!</p>
        
       <div className={style.socialContainer}>
        <img src="/src/assets/images_preview_rev_1.png" alt="" /> <a
        href="https://www.linkedin.com/in/evelyn-nobile-394405227/"
        target="_blank"
        rel="noopener noreferrer"
        title="Likedin profile"
      >
        <img
          alt="Linkedin profile"
          src="/src/assets/linkedin_preview_rev_1.png"
        />
      </a>
      </div>
        </div>

    </div>
  );
};

export default About;
