import React from "react";
import { Typography } from "@mui/material";
import { StyledLink } from "../../components/styled";
import { PageLayout } from "../../components/page-layout";

const TOS = () => {
  return (
    <PageLayout>
      <title>yksoba - Contact</title>
      <Typography component="h1" variant="h3">
        Terms of Service
      </Typography>
      <StyledLink to="/comms" sx={{ color: "white", my: 1 }}>
        ← Back to commissions
      </StyledLink>
      <p>
        Please read through this document carefully so you know what to expect
        throughout the process of commissioning my art. If you have any
        questions, feel free to{" "}
        <StyledLink to="/contact" sx={{ color: "white" }}>
          contact me
        </StyledLink>
        .
      </p>
      <ul>
        <li>
          If you are interested in commissioning my art, please reserve a slot
          under the appropriate listing.
          <ul>
            <li>
              Note that reserving a slot does not necessarily mean that I will
              accept your commission. I reserve the right to accept or decline
              commission requests at my discretion.
            </li>
            <li>
              The request queues are reset each month. I will let you know if
              you are removed from the request queue, and you will be granted
              priority if you submit a reservation again.
            </li>
            <li>I will notify you when I start working on your commission.</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          Once I have started working on your commission, you can expect an
          initial sketch within a week. At this point, I encourage you to
          respond with some edits/suggestions to ensure the final product will
          match your expectations.
          <ul>
            <li>
              I expect to do multiple rounds of editing the initial sketch, but
              please allow up to a week between revisions.
            </li>
            <li>
              Note that the price may vary from the base price depending on the
              complexity of the edits, the subject, or other factors. I will let
              you know if any suggestions will incur an extra cost before you
              commit to them.
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          Once we agree on a sketch, I will send you an invoice. Once the
          invoice is paid, I will begin work on the final drawing. At this
          point, only minor edits will be accepted, and major edits will incur
          an extra fee depending on the complexity of the edit. Please allow up
          to one month for the finished piece.
          <ul>
            <li>
              If circumstances arise that will delay the delivery of the final
              product, I will let you know and give you an updated timeline. At
              this point, you may cancel your order for a full refund, or you
              may opt to wait.
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          I reserve the right to post all versions of the finished product on
          social media.
        </li>
        <li>
          You are also welcome to post any version of the finished product on
          social media.
        </li>
        <li>
          All artwork I create is subject to{" "}
          <StyledLink to="/comms/license" sx={{ color: "white" }}>
            this license
          </StyledLink>
          <ul>
            <li>
              tl;dr - If you reproduce this art, you must give appropriate
              credit, provide a link to the license, and indicate if changes
              were made. You may do so in any reasonable manner, but not in any
              way that suggests the licensor endorses you or your use. You may
              not use the material for commercial purposes.
            </li>
          </ul>
        </li>
      </ul>
      <StyledLink to="/comms" sx={{ color: "white", my: 1 }}>
        ← Back to commissions
      </StyledLink>
    </PageLayout>
  );
};

export default TOS;
