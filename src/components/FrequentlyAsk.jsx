import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import faqImg from "../assets/FAQImg.png";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FrequentlyAsk = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="w-11/12 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <SectionTitle
            heading={"Frequently Asked Questions"}
            subHeading={
              "Get fast answers to frequently asked questions about our pets and adoption process."
            }
          />
        </div>

        {/* Cover Image */}
        <div className="mb-10">
          <img
            src={faqImg}
            alt="FAQ Cover"
            className="w-full object-cover rounded-lg shadow-md"
            style={{ height: "300px" }}
          />
        </div>

        {/* Accordion */}
        <div>
          {/* FAQ 1 */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" className="text-secondary">
                What is the adoption process for pets?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-info">
                Our adoption process includes selecting a pet, meeting the pet,
                and completing an adoption form followed by a home visit.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 2 */}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6" className="text-secondary">
                Are the pets vaccinated and neutered?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-info">
                Yes, all our pets are vaccinated and neutered before adoption to
                ensure their health and well-being.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 3 */}
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="h6" className="text-secondary">
                Can I return a pet after adoption?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-info">
                If unforeseen circumstances arise, we accept the pet back within
                30 days of adoption.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 4 */}
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography variant="h6" className="text-secondary">
                Do you provide any support after adoption?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-info">
                Yes, we provide guidance on pet care, behavior training, and
                health check-ups post-adoption.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* FAQ 5 */}
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography variant="h6" className="text-secondary">
                Can I visit the shelter before adopting?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-info">
                Absolutely! We encourage potential adopters to visit our shelter
                to meet and interact with the pets.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsk;
