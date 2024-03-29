import {useCallback} from 'react';
import {ReservationSummaryDescription} from '@/components/reservation-summary/ReservationSummaryDescription';
import {IScalable} from '@/hooks/Dimensions';
import {TableGroup, TableTime} from '@/models/Table';
import {MenuSanitized} from '@/models/Menu';
import {AnimatePresence, motion} from 'framer-motion';
import {Box, Image} from '@chakra-ui/react';

interface IReservationSummaryProps extends IScalable {
  groupSize?: number;
  groupDate?: TableTime;
  groupTime?: TableGroup;
  groupMenu?: MenuSanitized;
}

export const ReservationSummary = ({
  groupSize,
  groupDate,
  groupTime,
  groupMenu,
  isSmallDevice,
}: IReservationSummaryProps) => {
  /**
   * Returns true if any of the reservation data is not undefined
   */
  const hasData = useCallback(() => {
    return groupSize || groupDate || groupTime || groupMenu;
  }, [groupDate, groupMenu, groupSize, groupTime]);

  return (
    <Box
      position={'-webkit-sticky'}
      id={'summary'}
      w={'100%'}
      zIndex={1}
      sx={{
        position: 'sticky',
        top: isSmallDevice ? 0 : '4rem',
      }}>
      <Image
        src={'/hero-1.webp'}
        alt={'kame backdrop'}
        w={'100%'}
        h={`32rem`}
        mb={'1rem'}
        borderRadius={12}
        objectFit={'cover'}
        objectPosition={'left'}
      />

      <AnimatePresence>
        {hasData() && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}>
            <ReservationSummaryDescription
              isSmallDevice={isSmallDevice}
              groupDate={groupDate}
              groupTime={groupTime}
              groupSize={groupSize}
              groupMenu={groupMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
