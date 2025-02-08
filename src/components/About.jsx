import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 40,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'flex',
    fontSize: '1.2em',
    fontWeight: 600,
  },
  introImageContainer: {
    margin: 20,
    display: 'flex',
    justifyContent: 'flex-end', // Align the image to the right
    alignItems: 'center',
  },
  introImage: {
    width: '325px', // Larger size for the square image
    height: '480px', // Ensure height matches width for a square
    objectFit: 'cover', // Ensure the image maintains aspect ratio
    borderRadius: '12px', // Slightly rounded corners
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown>{text}</ReactMarkdown>;

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {
        // Provide fallback content in case of an error
        setData({
          about: 'Failed to fetch data. Please try again later.',
          imageSource: null,
        });
      });
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
                {data.imageSource && (
                  <Col style={styles.introImageContainer}>
                    <img src={data.imageSource} alt="profile" style={styles.introImage} />
                  </Col>
                )}
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
