import { useEffect, useState } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavigationItem } from './types';
import {
  DefaultMenuItems,
  FIREBASE_COLLECTION_CURRENT,
  FIREBASE_COLLECTION_RUN,
  FIREBASE_COLLECTION_RUN_GROUPS,
  FIREBASE_COLLECTION_RUN_POKEMON,
  FIREBASE_COLLECTION_RUNS,
  FIREBASE_COLLECTION_USERS,
} from './constants';
import { RootState } from './store';
import {
  FbCurrent,
  FbPokemon,
  FbRun,
  FbRunGroup,
  FbUser,
} from '../firebase/types';

declare global {
  interface Window {
    Cypress?: any;
  }
}

export const useRunGroups = () => {
  const groupSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.groups || [],
  );

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_RUN_GROUPS,
      storeAs: 'groups',
      orderBy: ['createdAt', 'asc'],
    },
  ]);
  const [groups, setGroups] = useState<FbRunGroup[]>([]);

  useEffect(() => {
    if (groupSelector) {
      setGroups(groupSelector);
    }
  }, [groupSelector]);

  return groups;
};

export const useMenuItems = () => {
  const runGroups = useRunGroups();
  const [menuItems, setMenuItems] =
    useState<NavigationItem[]>(DefaultMenuItems);

  useEffect(() => {
    if (runGroups && runGroups.length > 0) {
      setMenuItems([
        ...DefaultMenuItems,
        {
          label: 'Runs',
          link: `/runs`,
          items: runGroups.map((group) => ({
            label: group.name || '',
            link: `/runs/${group.id}`,
          })),
        },
      ]);
    }
  }, [runGroups]);

  return menuItems;
};

export const useAdmin = () => {
  const users = useSelector(
    (state: RootState) => state.firestore.ordered?.users || [],
  );
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;
  useFirestoreConnect([{ collection: FIREBASE_COLLECTION_USERS }]);
  // eslint-disable-next-line no-shadow
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (users) {
      setIsAdmin(
        !!users.find(
          (user: FbUser) =>
            firebaseSelector?.auth?.uid === user.id && user.admin,
        ) || false,
      );
    }
  }, [users]);

  return window.Cypress || isAdmin;
};

export const useRuns = (all?: boolean) => {
  const params = useParams();

  const current = useSelector(
    (state: RootState) => state.firestore.ordered?.current || [],
  );
  const runSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.runs || [],
  );

  useFirestoreConnect([
    { collection: FIREBASE_COLLECTION_CURRENT },
    {
      collection: FIREBASE_COLLECTION_RUNS,
      orderBy: ['createdAt', 'asc'],
      where: all
        ? undefined
        : [
            'groupId',
            '==',
            params?.runGroupId || current[0]?.currentGroupId || '',
          ],
    },
  ]);
  const [runs, setRuns] = useState<FbRun[]>([]);

  useEffect(() => {
    if (runSelector) {
      setRuns(runSelector);
    }
  }, [runSelector]);

  return runs;
};

export const useCurrentRun = () => {
  const params = useParams();

  const runSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.run || [],
  );

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_RUNS,
      doc: params.runId,
      storeAs: FIREBASE_COLLECTION_RUN,
    },
  ]);
  const [run, setRun] = useState<FbRun>();

  useEffect(() => {
    if (runSelector) {
      setRun(runSelector.at(0));
    }
  }, [runSelector]);

  return run;
};

export const useUserRunPokemon = (
  userId?: string,
  runGroupId?: string,
  runId?: string,
) => {
  const userRunPokemonSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.runPokemon || [],
  );
  useFirestoreConnect(
    userId && runGroupId && runId
      ? [
          {
            collection: FIREBASE_COLLECTION_USERS,
            doc: userId,
            subcollections: [
              {
                collection: FIREBASE_COLLECTION_RUN_GROUPS,
                doc: runGroupId,
                subcollections: [
                  {
                    collection: FIREBASE_COLLECTION_RUNS,
                    doc: runId,
                  },
                ],
              },
            ],
            storeAs: FIREBASE_COLLECTION_RUN_POKEMON,
          },
        ]
      : [],
  );

  const [pokemon, setPokemon] = useState<FbPokemon[]>([]);

  useEffect(() => {
    if (userRunPokemonSelector && userRunPokemonSelector.length > 0) {
      setPokemon(userRunPokemonSelector?.at(0)?.pokemon || []);
    }
  }, [userRunPokemonSelector]);

  return pokemon;
};

export const useUsers = () => {
  const userSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.users || [],
  );

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_USERS,
    },
  ]);
  const [users, setUsers] = useState<FbUser[]>([]);

  useEffect(() => {
    if (userSelector) {
      setUsers(userSelector);
    }
  }, [userSelector]);

  return users;
};

export const useCurrentUser = () => {
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;
  const userSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.users || [],
  );

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_USERS,
    },
  ]);
  const [currentUser, setCurrentUsers] = useState<FbUser>();

  useEffect(() => {
    if (userSelector && firebaseSelector) {
      setCurrentUsers(
        userSelector.find((user) =>
          window.Cypress
            ? '0LkyfKRyXQlwMJzme0cxYE8Zvni8'
            : firebaseSelector?.auth?.uid === user.id,
        ),
      );
    }
  }, [userSelector, firebaseSelector]);

  return currentUser;
};

export const useCurrent = () => {
  const currentSelector = useSelector(
    (state: RootState) => state.firestore.ordered?.current || [],
  );

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_CURRENT,
    },
  ]);
  const [current, setCurrent] = useState<FbCurrent>();

  useEffect(() => {
    if (currentSelector && currentSelector.length > 0) {
      setCurrent(currentSelector[0]);
    }
  }, [currentSelector]);

  return current;
};

export const useValidUser = () => {
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;
  const [validUser, setValidUser] = useState<boolean>(false);

  useEffect(() => {
    if (firebaseSelector?.profile?.isEmpty === false) {
      setValidUser(true);
    }
  }, [firebaseSelector]);

  return window.Cypress || validUser;
};
