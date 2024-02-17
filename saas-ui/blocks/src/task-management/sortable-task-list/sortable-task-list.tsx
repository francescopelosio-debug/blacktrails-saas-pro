import { Box, Checkbox, HStack, Portal, Tag, Text } from '@chakra-ui/react'
import {
  Active,
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  Over,
  UniqueIdentifier,
  closestCenter,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import {
  StructuredList,
  StructuredListButton,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'
import * as React from 'react'

export interface SortableTaskListProps extends DndContextProps {
  children: React.ReactNode
}

export const SortableTaskList: React.FC<SortableTaskListProps> = (props) => {
  const { children, onDragStart, onDragOver, onDragEnd, onDragCancel } = props

  const [items, setItems] = React.useState<Task[]>(tasks)

  const groupedItems = React.useMemo(() => {
    return items.reduce(
      (acc, task) => {
        if (!acc[task.status]) acc[task.status] = []

        acc[task.status].push(task)
        return acc
      },
      {} as Record<string, Task[]>,
    )
  }, [items])

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id)

  const activeItem = tasks.find((task) => task.id === activeId)
  const activeIndex = activeId ? getIndex(activeId) : -1

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event

    if (over) {
      const overIndex = getIndex(over.id)
      if (activeIndex !== overIndex) {
        setItems((items) => {
          if (
            activeItem &&
            over.data.current?.task.status !== activeItem?.status
          ) {
            const item = {
              ...activeItem,
              status: over.data.current?.task.status,
            }

            items[activeIndex] = item
          }

          return arrayMove(items, activeIndex, overIndex)
        })
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        if (!event.active) {
          return
        }
        setActiveId(event.active.id)
        onDragStart?.(event)
      }}
      onDragOver={onDragOver}
      onDragEnd={(event) => {
        handleDragEnd(event)
        onDragEnd?.(event)
      }}
      onDragCancel={(event) => {
        setActiveId(null)
        onDragCancel?.(event)
      }}
    >
      <SortableContext items={tasks}>
        <StructuredList py="0">
          {Object.entries(groupedItems).map(([status, tasks]) => (
            <React.Fragment key={status}>
              <TaskListHeader id={status} title={status} total={tasks.length} />
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </React.Fragment>
          ))}
        </StructuredList>
        <Portal>
          {activeItem ? (
            <DragOverlay
              style={{ minWidth: 200 }}
              modifiers={[snapCenterToCursor]}
            >
              <TaskListDragItem task={activeItem} />
            </DragOverlay>
          ) : null}
        </Portal>
      </SortableContext>
    </DndContext>
  )
}

const TaskListHeader: React.FC<{ id: string; title: string; total: number }> = (
  props,
) => {
  const { over, active } = useSortable({
    id: props.id,
    data: {
      type: 'header',
    },
  })

  const itemProps = useSortableProps({
    active,
    over,
    id: props.id,
  })

  return (
    <StructuredListHeader
      fontWeight="normal"
      bg="gray.200"
      _dark={{ bg: 'gray.700' }}
      color="app-text"
      {...itemProps}
    >
      {props.title}{' '}
      <Text as="span" color="muted">
        {props.total}
      </Text>
    </StructuredListHeader>
  )
}

const TaskListDragItem: React.FC<{ task: Task }> = (props) => {
  return (
    <Box
      display="inline-block"
      px="3"
      py="2"
      boxShadow="md"
      borderRadius="md"
      borderWidth="1px"
      bg="chakra-body-bg"
      width="auto"
      cursor="grabbing"
      userSelect="none"
    >
      {props.task.title}
    </Box>
  )
}

const useSortableProps = ({
  id,
  active,
  over,
}: {
  id: string
  active: Active | null
  over: Over | null
}) => {
  return {
    'data-dnd-dragging': active && active?.id === id ? 'true' : 'false',
    'data-dnd-over':
      active?.id !== over?.id && over?.id === id ? 'true' : 'false',
    'data-dnd-below-active':
      over?.data.current?.sortable.index > active?.data.current?.sortable.index,
    sx: {
      '&[data-dnd-dragging=true]': {
        opacity: 0.5,
      },
      '&[data-dnd-over=true]': {
        _after: {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '2px',
          background: 'primary.500',
        },
      },
      '&[data-dnd-below-active=false][data-dnd-over=true]': {
        _after: {
          top: '-1px',
        },
      },
      '&[data-dnd-below-active=true][data-dnd-over=true]': {
        _after: {
          bottom: '-1px',
        },
      },
    },
  }
}

const TaskListItem: React.FC<{ task: Task }> = (props) => {
  const { task } = props

  const { attributes, listeners, setNodeRef, over, active } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const itemProps = useSortableProps({
    active,
    over,
    id: task.id,
  })

  return (
    <StructuredListItem
      ref={setNodeRef}
      {...itemProps}
      position="relative"
      p="0"
      borderBottom="1px"
      borderColor="gray.100"
      fontSize="sm"
      _dark={{
        borderColor: 'whiteAlpha.100',
      }}
    >
      <StructuredListButton
        as={HStack}
        {...attributes}
        {...listeners}
        _hover={{
          bg: 'gray.50',
          _dark: {
            bg: 'whiteAlpha.50',
          },
        }}
      >
        <StructuredListCell width="4" role="group">
          <Checkbox
            opacity="0"
            _checked={{ opacity: 1 }}
            _groupHover={{ opacity: 1 }}
            size="md"
            rounded="sm"
          />
        </StructuredListCell>
        <StructuredListCell color="muted">{task.id}</StructuredListCell>
        <StructuredListCell flex="1">
          <Text>{task.title}</Text>
        </StructuredListCell>
        <StructuredListCell color="muted" as={HStack}>
          {task.labels.map((label) => (
            <Tag
              key={label}
              bg="none"
              border="1px solid"
              borderColor="blackAlpha.100"
              color="muted"
              rounded="full"
              _dark={{
                borderColor: 'whiteAlpha.100',
              }}
            >
              {label}
            </Tag>
          ))}
        </StructuredListCell>
        <StructuredListCell color="muted">{task.date}</StructuredListCell>
      </StructuredListButton>
    </StructuredListItem>
  )
}

interface Task {
  id: string
  title: string
  date: string
  labels: string[]
  status: 'in-progress' | 'todo'
}

const tasks: Task[] = [
  {
    id: 'SUI-123',
    title: 'Research product trends',
    date: '10 Jan',
    labels: ['research', 'trends'],
    status: 'in-progress',
  },
  {
    id: 'SUI-133',
    title: 'Develop user interface',
    date: '3 Feb',
    labels: ['UI', 'development'],
    status: 'in-progress',
  },
  {
    id: 'SUI-134',
    title: 'Create user experience flows',
    date: '5 Feb',
    labels: ['UX', 'flows'],
    status: 'in-progress',
  },
  {
    id: 'SUI-135',
    title: 'Select materials for production',
    date: '7 Feb',
    labels: ['materials', 'production'],
    status: 'in-progress',
  },
  {
    id: 'SUI-136',
    title: 'Work with engineers on product specifications',
    date: '9 Feb',
    labels: ['engineering', 'specifications'],
    status: 'in-progress',
  },
  {
    id: 'SUI-137',
    title: 'Conduct user research',
    date: '11 Feb',
    labels: ['user research', 'testing'],
    status: 'in-progress',
  },
  {
    id: 'SUI-124',
    title: 'Brainstorm product ideas',
    date: '12 Jan',
    labels: ['brainstorming', 'ideas'],
    status: 'todo',
  },
  {
    id: 'SUI-125',
    title: 'Create initial sketches',
    date: '15 Jan',
    labels: ['sketches', 'design'],
    status: 'todo',
  },
  {
    id: 'SUI-126',
    title: 'Get feedback on sketches',
    date: '17 Jan',
    labels: ['feedback', 'design'],
    status: 'todo',
  },
  {
    id: 'SUI-127',
    title: 'Refine and finalize design',
    date: '20 Jan',
    labels: ['design', 'refinement'],
    status: 'todo',
  },
  {
    id: 'SUI-128',
    title: 'Create 3D model',
    date: '23 Jan',
    labels: ['3D', 'model'],
    status: 'todo',
  },
  {
    id: 'SUI-129',
    title: 'Test and iterate prototype',
    date: '25 Jan',
    labels: ['testing', 'prototype'],
    status: 'todo',
  },
  {
    id: 'SUI-130',
    title: 'Refine prototype based on feedback',
    date: '27 Jan',
    labels: ['feedback', 'iteration'],
    status: 'todo',
  },
  {
    id: 'SUI-131',
    title: 'Create final product',
    date: '30 Jan',
    labels: ['final', 'product'],
    status: 'todo',
  },
  {
    id: 'SUI-132',
    title: 'Test final product before launch',
    date: '1 Feb',
    labels: ['testing', 'final'],
    status: 'todo',
  },
]
