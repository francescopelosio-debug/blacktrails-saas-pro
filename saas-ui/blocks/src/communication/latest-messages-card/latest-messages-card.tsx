import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import {
  PersonaAvatar,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import * as React from 'react'
import { LuChevronRight, LuMoreVertical } from 'react-icons/lu'

const chats = [
  {
    name: 'Jane Fonda',
    avatar: '',
    date: '2 days ago',
    message: 'Looking forward to our meeting!',
    presence: 'online',
    unread: true,
  },
  {
    name: 'Dianne Russell',
    avatar: '',
    date: '16 May 2023',
    message: 'Can you send the file?',
    presence: 'dnd',
    unread: false,
  },
  {
    name: 'Courtney Henry',
    avatar: '',
    date: '3 Jan 2023',
    message: 'See you at 7pm!',
    presence: 'busy',
    unread: true,
  },
]

export interface LatestMessagesCardProps {
  children: React.ReactNode
}

export function LatestMessagesCard() {
  return (
    <Card size="sm">
      <CardHeader borderBottomWidth="1px">
        <Heading size="sm" fontWeight="medium">
          Latest messages
        </Heading>
      </CardHeader>
      <CardBody p="0">
        <StructuredList pb="0">
          {chats.map((item, i) => (
            <StructuredListItem key={i} href="#">
              <StructuredListCell px="2">
                <PersonaAvatar
                  presence={item.presence}
                  name={item.name}
                  src={item.avatar}
                  size="sm"
                />
              </StructuredListCell>
              <StructuredListCell flex="1" px="2">
                <Heading as="h4" size="xs" mb="1">
                  {item.name}
                </Heading>
                <Text color="muted" fontSize="xs" noOfLines={1}>
                  {item.message}
                </Text>
              </StructuredListCell>
              <StructuredListCell>
                <Text color="muted" fontSize="xs">
                  {item.date}
                </Text>
              </StructuredListCell>
              <StructuredListCell px="2">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    icon={<LuMoreVertical />}
                  />
                  <MenuList>
                    <MenuItem>Reply</MenuItem>
                  </MenuList>
                </Menu>
              </StructuredListCell>
            </StructuredListItem>
          ))}
          <StructuredListItem
            bg="gray.50"
            _dark={{
              bg: 'gray.700',
            }}
            borderBottomRadius="md"
            mt="2"
            href="#"
          >
            <Text flex="1" textAlign="center">
              View all messages
            </Text>
          </StructuredListItem>
        </StructuredList>
      </CardBody>
    </Card>
  )
}
