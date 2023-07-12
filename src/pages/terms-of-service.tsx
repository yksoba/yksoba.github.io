import { PageProps } from "gatsby";
import React from "react";
import { Header } from "../components/common/header";
import { Layout } from "../components/common/layout";
import { FullDivider } from "../components/common/misc";
import { Container, Link, Typography, Box } from "@mui/material";

const Page = (props: PageProps) => {
  return (
    <Layout pageProps={props}>
      <Header />
      <FullDivider />
      <Box bgcolor="rgba(0,0,0,0.5)">
        <Container
          sx={{
            py: 4,
            a: {
              color: "#AFF",
            },
            h3: {
              mt: 3,
            },
          }}
          fixed
        >
          <Typography variant="h2" textAlign="center">
            Terms of Service
          </Typography>
          <Typography variant="body1">
            All commissions and commission requests will be governed by these
            terms of service. Feel free to reach out with any questions or
            concerns regarding these terms or the commissioning process by
            sending an email to{" "}
            <Link href="mailto:the.yk.soba@gmail.com" target="_blank">
              the.yk.soba@gmail.com
            </Link>
            .
          </Typography>
          <Typography variant="h3">Payment</Typography>
          <ul>
            <li>
              <Typography variant="body1">
                We will discuss the scope of the commission, and I will give you
                an initial estimate of the total cost.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                You agree to pay 50% of initial estimate up-front, and the
                remainder of the total cost will be due within one week after
                delivery of the final product. We may also discuss alternate
                payment plans if necessary.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                I only accept payments via PayPal, though we can discuss other
                payment options if necessary.
              </Typography>
            </li>
          </ul>
          <Typography variant="h3">Timeline</Typography>
          <ul>
            <li>
              You can expect me to send you:
              <ul>
                <li>First sketch within 1 week</li>
                <li>Lined draft within 2 weeks</li>
                <li>Flat-shaded draft within 3 weeks</li>
                <li>Full-color draft within 4-6 weeks</li>
              </ul>
            </li>
            <li>
              I will let you know if circumstances arise and the estimated
              turnaround will be longer. Please also let me know ahead of time
              if you need the finished piece by a strict deadline, and we can
              work things out.
            </li>
            <li>
              You may request edits or changes at any stage
              <ul>
                <li>
                  Minor edits will usually incur no additional charge
                  <ul>
                    <li>
                      Changes at the sketch level are almost always considered
                      minor, unless you are adding additional characters or
                      significantly increasing the complexity of your request
                    </li>
                  </ul>
                </li>
                <li>
                  Major edits (or an excessive number of edits) may incur
                  additional charge
                  <ul>
                    <li>
                      Changes after I have sent you the lineart draft are more
                      likely to be considered major changes, though edits that
                      concern only a small area of the piece will likely be
                      considered minor.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              I will discuss these charges with you prior to commitment. We can
              continue to discuss different edits until you are satisfied with
              the expected product and cost. You may also opt to cancel your
              commission entirely, subject to the terms below
            </li>
          </ul>
          <Typography variant="h3">Communication</Typography>
          <ul>
            <li>
              I will be contacting you via email sent from the.yk.soba@gmail.com
            </li>
            <li>
              We may also use other communication media, depending on what fits
              the situation the best
            </li>
            <li>
              If I can’t reach you (i.e., I do not get a reply from you within 2
              weeks), I may assume that you are canceling your commission.
              However, if extenuating circumstances arise, please let me know as
              soon as possible and we can discuss options (e.g., putting your
              commission on hold).
            </li>
          </ul>
          <Typography variant="h3">Termination</Typography>
          <ul>
            <li>
              I reserve the right to refuse commission requests for any reason
              without further contact.
            </li>
            <li>
              You retain the right to cancel your commission at any point, for
              any reason
              <ul>
                <li>
                  You agree to forfeit any down payments already made upon
                  cancellation
                </li>
              </ul>
            </li>
            <li>
              I retain the right to cancel your commission at any point, for any
              reason
              <ul>
                <li>
                  I do not anticipate that I will cancel your commission without
                  having a very good reason
                </li>
                <li>
                  You will be entitled to a full refund, including any down
                  payments already made, unless you have violated these terms.
                </li>
              </ul>
            </li>
          </ul>
          <Typography variant="h3">Copyright</Typography>
          <ul>
            <li>
              I reserve copyright ownership of all works-in-progress that I may
              share with you throughout the process of completing your
              commission, and I retain the right to re-use such materials for
              future works and commissions.
            </li>
            <li>
              I also retain the right to use the final product in promotion and
              marketing (e.g., posting finished works on social media).
            </li>
            <li>
              I will grant you a license of the final product, effective upon
              receiving the full payment. The license includes the right to
              make, have made, sell, use, reproduce, modify, adapt, display,
              distribute, make other versions of the property and to sublicense
              others to do these things.
            </li>
          </ul>
        </Container>
      </Box>
    </Layout>
  );
};

export default Page;
