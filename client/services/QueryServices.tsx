"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails, updateUserDetails } from "./ApiServices";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";

export const useFetchLoginedUserDetails = () => {
  const { userInfo } = useUserAuthenticated();
  const userId = userInfo?.currentUserId;
  return useQuery({
    queryKey: ["user-details", userId],
    queryFn: () => {
      if (!userId) return Promise.reject("No userId");
      return fetchUserDetails(userId);
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

export const useFetchOtherUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["other-user-details", userId],
    queryFn: () => {
      if (!userId) return Promise.reject("No userId");
      return fetchUserDetails(userId);
    },
  });
};

export const useUpdateUserDetails = () => {
  const { userInfo } = useUserAuthenticated();
  const queryInvalidate = useQueryClient();
  const userId = userInfo?.currentUserId;
  return useMutation({
    mutationFn: (userDetails: Partial<UserData>) => {
      if (!userId) return Promise.reject("No userId");
      return updateUserDetails(userId, userDetails);
    },
    onSuccess: () => {
      queryInvalidate.invalidateQueries({
        queryKey: ["user-details", userId],
      });
    },
  });
};
