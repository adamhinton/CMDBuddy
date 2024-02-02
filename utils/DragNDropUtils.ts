// README:
// Shared utils between Drag and Drop functionalities in different parts of the app
// Right now PCEF and CISB use this; maybe more in the future

import Image from "next/image";
import styled from "styled-components";

/**Contains  DnD handle icon
 * 
import DragNDropHandleIcon from "~/utils/images/drag-drop-handle.svg";
 * 
*/
export const DragNDropIconImage = styled(Image)`
	max-height: 100%;
`;
