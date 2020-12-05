import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const QuestionTile = ({ question }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{question.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {question.difficulty} | Max score: 10
              </Card.Subtitle>
            </Col>
            <Link to={{ pathname: "/question", data: question }}>
              <Button>Solve Challange</Button>
            </Link>
            <div style={{ padding: "1rem" }}></div>
          </Row>
        </Card.Body>
      </Card>
      ))
    </div>
  );
};

export default QuestionTile;
