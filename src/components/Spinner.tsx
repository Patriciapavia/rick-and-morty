import { Spinner as Spin, Box, Center } from '@chakra-ui/react';

type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
};

const Spinner = ({ size = 'xl', color = 'blue' }: SpinnerProps) => {
  return (
    <Box
      data-testid='spinner'
      height='80vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Center>
        <Spin size={size} color={color} />
      </Center>
    </Box>
  );
};

export default Spinner;
