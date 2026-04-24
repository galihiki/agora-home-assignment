import { Code, Heading, Box } from "@chakra-ui/react";

export const Intro = () => (
  <>
    <Heading size="2xl">Let's Build a Table</Heading>
    <p>
      Let's build a data table using existing column definitions and mock data.
      <br />
      Here are the reuqirements:
    </p>
    <Box as="ul">
      <Box as="li">The header cells should be able to display only text</Box>
      <Box as="li">
        The body cells should be able to display either text or a JSX element
      </Box>
      <Box as="li">
        The columns would have 2 available sizes:
        <Box as="ul">
          <Box as="li">
            <Code>s</Code> - will have <Code>min-width</Code> of{" "}
            <Code>100px</Code>
          </Box>
          <Box as="li">
            <Code>m</Code> - will have <Code>min-width</Code> of{" "}
            <Code>200px</Code>
          </Box>
        </Box>
      </Box>
    </Box>
    <p>
      The mock data is available as JSON in the <Code>mock-data.json</Code>{" "}
      file.
    </p>
    <p>
      There are ready-to-go column definitions in <Code>columns.tsx</Code>
    </p>
    <p>
      Here's an example of a the table:
      <img src="https://i.postimg.cc/15BTKQ0Z/Screenshot-2024-12-01-at-11-21-57.png" />
    </p>
  </>
);
