import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as styles from './navbar.module.css';

const Index = ({ email: { email } }) => {
  const [display, setDisplay] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [signUp, setSignUp] = React.useState('');
  const [createNew, setCreateNew] = React.useState('');
  const barOne = React.useRef<HTMLDivElement>(null);
  const barTwo: any = React.useRef<HTMLDivElement>(null);
  const barThree = React.useRef<HTMLDivElement>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  // const linkRefTwo = React.useRef<HTMLAnchorElement>(null);

  const clickHandler: Function = () => {
    if (!display) {
      barTwo.current.style.opacity = 0;
      barOne.current.classList.add(styles.rotateDown);
      barThree.current.classList.add(styles.rotateUp);
      dropRef.current.classList.add(styles.animateDown);
      dropRef.current.classList.remove(styles.animateUp);
      barOne.current.style.background = '#000';
      barThree.current.style.background = '#000';
      setDisplay(!display);
    } else {
      if (window.scrollY < 800) {
        barOne.current.style.background = '#fff';
        barTwo.current.style.background = '#fff';
        barThree.current.style.background = '#fff';
      }
      barTwo.current.style.opacity = 1;
      barOne.current.classList.remove(styles.rotateDown);
      barThree.current.classList.remove(styles.rotateUp);
      dropRef.current.classList.remove(styles.animateDown);
      dropRef.current.classList.add(styles.animateUp);
      setDisplay(!display);
    }
  };
  React.useEffect(() => {
    JSON.parse(JSON.stringify(email)) ? setLoggedIn('recipes') : setLoggedIn('login');
    JSON.parse(JSON.stringify(email)) ? setStatus('create') : setStatus('signup');
    JSON.parse(JSON.stringify(email)) ? setCreateNew('a New Recipe') : setCreateNew(null);
    JSON.parse(JSON.stringify(email)) ? setSignUp(null) : setSignUp('Signup');
  }, []);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      let scroll = window.scrollY;
      if (scroll > 800) {
        barOne.current.style.background = '#000';
        barTwo.current.style.background = '#000';
        barThree.current.style.background = '#000';
        linkRef.current.style.color = '#000';
        // linkRefTwo.current.style.color = '#000';
      } else if (scroll < 800) {
        barOne.current.style.background = '#fff';
        barTwo.current.style.background = '#fff';
        barThree.current.style.background = '#fff';
        linkRef.current.style.color = '#fff';
        // linkRefTwo.current.style.color = '#fff';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const twoStyles = `${styles.navLinkOne} ${styles.loggedIn}`;
  return (
    <div className={styles.placeholder}>
      <nav className={styles.nav}>
        <NavLink
          to={`${loggedIn}`}
          className={loggedIn ? twoStyles : styles.navLinkOne}
          ref={linkRef}>
          {loggedIn}
        </NavLink>
        {/* <NavLink
          to="signup"
          className={!loggedIn ? styles.navLinkTwo : styles.null}
          ref={linkRefTwo}>
          Signup
        </NavLink> */}
        <div className={styles.menu} onClick={() => clickHandler()}>
          <div className={styles.bar} ref={barOne} />
          <div className={styles.bar} ref={barTwo} />
          <div className={styles.bar} ref={barThree} />
        </div>
        <div className={styles.dropdown} ref={dropRef}>
          <span className={styles.dropdownContainer}>
            <div className={styles.dropdownLinkDiv}>
              <span className={styles.dropdownLinkSpan}>
                <NavLink to="/" className={styles.dropdownLink} activeClassName={styles.active}>
                  Home
                </NavLink>
              </span>
              <span className={styles.dropdownLinkSpan}>
                <NavLink
                  to={`${loggedIn}`}
                  className={styles.dropdownLink}
                  activeClassName={styles.active}>
                  {loggedIn}
                </NavLink>
              </span>
              <span className={styles.dropdownLinkSpan}>
                <NavLink
                  to={`${status}`}
                  className={styles.dropdownLink}
                  activeClassName={styles.active}>
                  {status} {createNew}
                </NavLink>
              </span>
            </div>
          </span>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: { email }) => ({
  email: state.email,
});

export default connect(mapStateToProps)(Index);
